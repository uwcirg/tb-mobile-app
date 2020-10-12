import React from 'react'
import useLogout from './Logout'
import Button from '@material-ui/core/Button'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      console.log(error)
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
     console.log("error here")
      
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (<div>
          <h1>Something went wrong.</h1>
          <LogOutButton />
          <Button onClick={()=>{location.reload()}}> Refresh Page</Button>
          </div>);
      }
  
      return this.props.children; 
    }
  }

  const LogOutButton = () => {
    const logout = useLogout();

    const handleClick = () => {
      logout();
      location.reload();
    }
    return (
      <Button onClick={handleClick}> Log Out</Button>
    )
  }