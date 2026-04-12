<?php
/**
 * Plugin Name: DevKunal Portfolio Tools
 * Description: Portfolio projects, starter pages, and an Elementor-friendly project grid shortcode.
 * Version: 1.0.0
 * Author: Codex
 * Text Domain: devkunal-portfolio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const DK_PORTFOLIO_OPTION = 'dk_portfolio_site_seeded';

register_activation_hook( __FILE__, 'dk_portfolio_activate' );
register_deactivation_hook( __FILE__, 'dk_portfolio_deactivate' );

add_action( 'init', 'dk_portfolio_register_content' );
add_shortcode( 'portfolio_project_grid', 'dk_portfolio_project_grid_shortcode' );

function dk_portfolio_register_content() {
	register_post_type(
		'project',
		array(
			'labels' => array(
				'name'          => __( 'Projects', 'devkunal-portfolio' ),
				'singular_name' => __( 'Project', 'devkunal-portfolio' ),
				'add_new_item'  => __( 'Add New Project', 'devkunal-portfolio' ),
				'edit_item'     => __( 'Edit Project', 'devkunal-portfolio' ),
			),
			'public'       => true,
			'menu_icon'    => 'dashicons-portfolio',
			'show_in_rest' => true,
			'has_archive'  => true,
			'rewrite'      => array( 'slug' => 'projects' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
		)
	);

	register_taxonomy(
		'project_type',
		'project',
		array(
			'labels'            => array(
				'name'          => __( 'Project Types', 'devkunal-portfolio' ),
				'singular_name' => __( 'Project Type', 'devkunal-portfolio' ),
			),
			'public'            => true,
			'show_in_rest'      => true,
			'hierarchical'      => true,
			'show_admin_column' => true,
		)
	);

	add_post_type_support( 'project', 'elementor' );
}

function dk_portfolio_activate() {
	dk_portfolio_register_content();
	dk_portfolio_enable_elementor_for_projects();
	dk_portfolio_seed_terms();
	dk_portfolio_seed_projects();
	dk_portfolio_seed_pages();
	flush_rewrite_rules();
}

function dk_portfolio_deactivate() {
	flush_rewrite_rules();
}

function dk_portfolio_enable_elementor_for_projects() {
	$supported = get_option( 'elementor_cpt_support', array( 'page', 'post' ) );

	if ( ! is_array( $supported ) ) {
		$supported = array( 'page', 'post' );
	}

	if ( ! in_array( 'project', $supported, true ) ) {
		$supported[] = 'project';
		update_option( 'elementor_cpt_support', array_values( array_unique( $supported ) ) );
	}
}

function dk_portfolio_seed_terms() {
	$terms = array( 'Brand Design', 'Web Experience', 'Motion' );

	foreach ( $terms as $term_name ) {
		if ( ! term_exists( $term_name, 'project_type' ) ) {
			wp_insert_term( $term_name, 'project_type' );
		}
	}
}

function dk_portfolio_seed_projects() {
	$existing = get_posts(
		array(
			'post_type'      => 'project',
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);

	if ( ! empty( $existing ) ) {
		return;
	}

	$projects = array(
		array(
			'title'   => 'Atlas Studio Rebrand',
			'excerpt' => 'Identity refresh, landing page system, and launch visuals for a boutique creative studio.',
			'content' => 'Use this project page for the full case study. Add mockups, process notes, results, and client quotes here.',
			'type'    => 'Brand Design',
		),
		array(
			'title'   => 'Northline Portfolio Platform',
			'excerpt' => 'A streamlined portfolio and inquiry experience designed for a modern product consultant.',
			'content' => 'Document the challenge, your role, the visual direction, and the measurable outcomes of the work.',
			'type'    => 'Web Experience',
		),
		array(
			'title'   => 'Frame Motion System',
			'excerpt' => 'Launch animations and social teasers created to give a new product release a sharper story.',
			'content' => 'Replace this with your own case study, embedded reels, before and after visuals, or animation breakdown.',
			'type'    => 'Motion',
		),
	);

	foreach ( $projects as $project ) {
		$post_id = wp_insert_post(
			array(
				'post_type'    => 'project',
				'post_status'  => 'publish',
				'post_title'   => $project['title'],
				'post_excerpt' => $project['excerpt'],
				'post_content' => $project['content'],
			)
		);

		if ( $post_id && ! is_wp_error( $post_id ) ) {
			wp_set_post_terms( $post_id, array( $project['type'] ), 'project_type' );
		}
	}
}

function dk_portfolio_seed_pages() {
	if ( get_option( DK_PORTFOLIO_OPTION ) ) {
		return;
	}

	$home_id = dk_portfolio_upsert_page( 'Home', 'home', dk_portfolio_home_content() );
	$about_id = dk_portfolio_upsert_page( 'About', 'about', dk_portfolio_basic_page_content( 'About', 'Tell people who you are, how you work, and the kind of clients or roles you want to attract.' ) );
	$contact_id = dk_portfolio_upsert_page( 'Contact', 'contact', dk_portfolio_basic_page_content( 'Contact', 'Add your email, booking link, social profiles, or a contact form here so visitors know the next step.' ) );
	$journal_id = dk_portfolio_upsert_page( 'Journal', 'journal', '' );

	foreach ( array( $home_id, $about_id, $contact_id ) as $page_id ) {
		if ( $page_id ) {
			update_post_meta( $page_id, '_wp_page_template', 'page-no-title' );
		}
	}

	if ( $home_id ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', (int) $home_id );
	}

	if ( $journal_id ) {
		update_option( 'page_for_posts', (int) $journal_id );
	}

	update_option( DK_PORTFOLIO_OPTION, 1 );
}

function dk_portfolio_upsert_page( $title, $slug, $content ) {
	$page = get_page_by_path( $slug, OBJECT, 'page' );

	$args = array(
		'post_title'   => $title,
		'post_name'    => $slug,
		'post_type'    => 'page',
		'post_status'  => 'publish',
		'post_content' => $content,
	);

	if ( $page ) {
		$args['ID'] = $page->ID;
		return wp_update_post( $args, true );
	}

	return wp_insert_post( $args, true );
}

function dk_portfolio_home_content() {
	return <<<'HTML'
<!-- wp:group {"align":"wide","className":"dk-hero","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|50","bottom":"var:preset|spacing|60","left":"var:preset|spacing|50"},"blockGap":"28px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide dk-hero" style="padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--50)">
	<!-- wp:paragraph {"className":"dk-eyebrow"} -->
	<p class="dk-eyebrow">Creative Portfolio</p>
	<!-- /wp:paragraph -->
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"40px"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"65%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:65%">
			<!-- wp:heading {"level":1} -->
			<h1 class="wp-block-heading">I build thoughtful brand and web experiences that feel clear, modern, and human.</h1>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"fontSize":"large","textColor":"accent-4"} -->
			<p class="has-accent-4-color has-text-color has-large-font-size">Use this site to showcase your best work, explain your process, and turn visitors into inquiries. You can redesign every section later with Elementor.</p>
			<!-- /wp:paragraph -->
			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#work">View Work</a></div>
				<!-- /wp:button -->
				<!-- wp:button {"className":"is-style-outline"} -->
				<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/contact">Start a Project</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->
		<!-- wp:column {"verticalAlignment":"center","width":"35%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:35%">
			<!-- wp:group {"className":"dk-stat","layout":{"type":"constrained"}} -->
			<div class="wp-block-group dk-stat">
				<!-- wp:paragraph {"className":"dk-eyebrow"} -->
				<p class="dk-eyebrow">Focus</p>
				<!-- /wp:paragraph -->
				<!-- wp:paragraph -->
				<p>Brand identity, portfolio sites, landing pages, case studies, and polished client presentation.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
			<!-- wp:spacer {"height":"16px"} -->
			<div style="height:16px" aria-hidden="true" class="wp-block-spacer"></div>
			<!-- /wp:spacer -->
			<!-- wp:group {"className":"dk-stat","layout":{"type":"constrained"}} -->
			<div class="wp-block-group dk-stat">
				<!-- wp:paragraph {"className":"dk-eyebrow"} -->
				<p class="dk-eyebrow">Best For</p>
				<!-- /wp:paragraph -->
				<!-- wp:paragraph -->
				<p>Freelancers, designers, developers, photographers, agencies, and anyone who needs a sharp personal website.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
<!-- wp:spacer {"height":"var:preset|spacing|60"} --><div style="height:var(--wp--preset--spacing--60)" aria-hidden="true" class="wp-block-spacer"></div><!-- /wp:spacer -->
<!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide">
	<!-- wp:paragraph {"className":"dk-eyebrow"} --><p class="dk-eyebrow">Services</p><!-- /wp:paragraph -->
	<!-- wp:heading --><h2 class="wp-block-heading">Shape this section around your strongest offers.</h2><!-- /wp:heading -->
	<!-- wp:columns {"style":{"spacing":{"margin":{"top":"32px"}}}} -->
	<div class="wp-block-columns" style="margin-top:32px">
		<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"className":"dk-card","layout":{"type":"constrained"}} --><div class="wp-block-group dk-card"><!-- wp:paragraph {"className":"dk-eyebrow"} --><p class="dk-eyebrow">01</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Portfolio Design</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Create a focused website that presents your work, your point of view, and your offer without clutter.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
		<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"className":"dk-card","layout":{"type":"constrained"}} --><div class="wp-block-group dk-card"><!-- wp:paragraph {"className":"dk-eyebrow"} --><p class="dk-eyebrow">02</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Case Study Writing</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Turn screenshots and finished visuals into clear stories that explain process, decisions, and outcomes.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
		<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"className":"dk-card","layout":{"type":"constrained"}} --><div class="wp-block-group dk-card"><!-- wp:paragraph {"className":"dk-eyebrow"} --><p class="dk-eyebrow">03</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Launch Support</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Support your new site with messaging, calls to action, and a cleaner path from visitor to inquiry.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
<!-- wp:spacer {"height":"var:preset|spacing|60"} --><div style="height:var(--wp--preset--spacing--60)" aria-hidden="true" class="wp-block-spacer"></div><!-- /wp:spacer -->
<!-- wp:group {"align":"wide","anchor":"work","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide" id="work">
	<!-- wp:paragraph {"className":"dk-eyebrow"} --><p class="dk-eyebrow">Selected Work</p><!-- /wp:paragraph -->
	<!-- wp:heading --><h2 class="wp-block-heading">Your sample projects are already connected here.</h2><!-- /wp:heading -->
	<!-- wp:paragraph {"textColor":"accent-4"} --><p class="has-accent-4-color has-text-color">Add or edit projects in the WordPress dashboard, then keep this grid or drop the shortcode into any Elementor page.</p><!-- /wp:paragraph -->
	<!-- wp:spacer {"height":"24px"} --><div style="height:24px" aria-hidden="true" class="wp-block-spacer"></div><!-- /wp:spacer -->
	<!-- wp:shortcode -->[portfolio_project_grid limit="6" columns="3"]<!-- /wp:shortcode -->
</div>
<!-- /wp:group -->
<!-- wp:spacer {"height":"var:preset|spacing|60"} --><div style="height:var(--wp--preset--spacing--60)" aria-hidden="true" class="wp-block-spacer"></div><!-- /wp:spacer -->
<!-- wp:group {"align":"wide","className":"dk-cta-band","style":{"spacing":{"padding":{"top":"var:preset|spacing|50","right":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide dk-cta-band" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">
	<!-- wp:columns {"verticalAlignment":"center"} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"65%"} --><div class="wp-block-column is-vertically-aligned-center" style="flex-basis:65%"><!-- wp:paragraph {"className":"dk-eyebrow","textColor":"accent-3"} --><p class="dk-eyebrow has-accent-3-color has-text-color">Next Step</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Ready to make this fully yours? Open the Home page with Elementor and start customizing.</h2><!-- /wp:heading --></div><!-- /wp:column -->
		<!-- wp:column {"verticalAlignment":"center","width":"35%"} --><div class="wp-block-column is-vertically-aligned-center" style="flex-basis:35%"><!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} --><div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"accent-3","textColor":"contrast"} --><div class="wp-block-button"><a class="wp-block-button__link has-contrast-color has-accent-3-background-color has-text-color has-background wp-element-button" href="/contact">Contact Page</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
HTML;
}

function dk_portfolio_basic_page_content( $heading, $copy ) {
	$heading = esc_html( $heading );
	$copy    = esc_html( $copy );

	return <<<HTML
<!-- wp:group {"align":"wide","className":"dk-card","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|50","bottom":"var:preset|spacing|60","left":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide dk-card" style="padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--50)">
	<!-- wp:paragraph {"className":"dk-eyebrow"} --><p class="dk-eyebrow">Page</p><!-- /wp:paragraph -->
	<!-- wp:heading {"level":1} --><h1 class="wp-block-heading">{$heading}</h1><!-- /wp:heading -->
	<!-- wp:paragraph {"fontSize":"large","textColor":"accent-4"} --><p class="has-accent-4-color has-text-color has-large-font-size">{$copy}</p><!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
HTML;
}

function dk_portfolio_project_grid_shortcode( $atts ) {
	$atts = shortcode_atts(
		array(
			'limit'   => 6,
			'columns' => 3,
			'type'    => '',
		),
		$atts,
		'portfolio_project_grid'
	);

	$columns = max( 1, min( 4, absint( $atts['columns'] ) ) );
	$limit   = max( 1, min( 12, absint( $atts['limit'] ) ) );

	$args = array(
		'post_type'      => 'project',
		'post_status'    => 'publish',
		'posts_per_page' => $limit,
		'orderby'        => array(
			'menu_order' => 'ASC',
			'date'       => 'DESC',
		),
	);

	if ( ! empty( $atts['type'] ) ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'project_type',
				'field'    => 'slug',
				'terms'    => sanitize_title( $atts['type'] ),
			),
		);
	}

	$query = new WP_Query( $args );

	if ( ! $query->have_posts() ) {
		return '<p>' . esc_html__( 'Add a few portfolio projects to show them here.', 'devkunal-portfolio' ) . '</p>';
	}

	$style = sprintf( 'style="grid-template-columns:repeat(%d,minmax(0,1fr))"', $columns );

	ob_start();
	?>
	<div class="dk-project-grid" <?php echo wp_kses_post( $style ); ?>>
		<?php while ( $query->have_posts() ) : $query->the_post(); ?>
			<?php
			$terms = get_the_terms( get_the_ID(), 'project_type' );
			$type  = ! is_wp_error( $terms ) && ! empty( $terms ) ? $terms[0]->name : __( 'Project', 'devkunal-portfolio' );
			?>
			<article <?php post_class( 'dk-project-card' ); ?>>
				<a href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( get_the_title() ); ?>">
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="dk-project-thumb"><?php the_post_thumbnail( 'large' ); ?></div>
					<?php else : ?>
						<div class="dk-project-placeholder" aria-hidden="true"></div>
					<?php endif; ?>
				</a>
				<div class="dk-project-content">
					<div class="dk-project-type"><?php echo esc_html( $type ); ?></div>
					<h3 class="wp-block-heading"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
					<div class="dk-project-meta"><?php echo esc_html( get_the_excerpt() ); ?></div>
				</div>
			</article>
		<?php endwhile; ?>
	</div>
	<?php
	wp_reset_postdata();

	return ob_get_clean();
}
