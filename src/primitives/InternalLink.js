import React from "react"

export default ({ store, to, children, ...props }) => (
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
        store.showPage(to)
      }
    }}

    href={to && to.route}
    {...props}
  >
    {children}
  </a>
)
