import { Link } from 'react-router-dom'

function NotchedButton({
  children,
  className = '',
  href,
  target,
  to,
  variant = 'light',
  ...props
}) {
  const classes = ['notched-button', `notched-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a className={classes} href={href} rel="noreferrer" target={target} {...props}>
        <span>{children}</span>
      </a>
    )
  }

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      <span>{children}</span>
    </button>
  )
}

export default NotchedButton
