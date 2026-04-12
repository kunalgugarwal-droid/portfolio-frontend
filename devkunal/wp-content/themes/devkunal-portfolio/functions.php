<?php
/**
 * Theme functions for DevKunal Portfolio.
 *
 * @package DevKunalPortfolio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style(
			'devkunal-portfolio-parent-style',
			get_template_directory_uri() . '/style.css',
			array(),
			wp_get_theme( get_template() )->get( 'Version' )
		);
	},
	5
);
