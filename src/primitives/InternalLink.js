import React from "react"

const InternalLink = ({ assembly, to, children, ...props }) => (
  <a
    onClick={e => {
      if(e.metaKey || e.ctrlKey)
        // The user intends to open the link in a new tab;
        // let the browser handle the click.
        return;
      else {
        // The user wants to open the page in the current tab;
        // use single-page-app routing for a quick page load.
        e.preventDefault()
        assembly.currentPage = to
      }
    }}

    // This is the main thing.
    // It renders it as a valid `<a href="/.../...">link</a>`.
    // Any extra attributes get passed through to the `a` tag.
    href={to && to.route}
    {...props}
  >
    {children}
  </a>
)

export default InternalLink
