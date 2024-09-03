import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const withAuthentication = (WrappedComponent) => {
    return function AuthComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(null)

        useEffect(() => {
            const token = document?.cookie.split('; ').find(row => row.startsWith('chip='))
            // console.log(token.split('chip=')[0])
            if (token) {
                console.log('okay')
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false);
            }
        }, [])

        if (isAuthenticated === null) {
            // Render a loading state or nothing until authentication is determined
            return <div></div>;
        }

        if (isAuthenticated === false) {
            console.log('op')
            return <Navigate to='/login' replace />
        }

        // if (isAuthenticated === true) {
        return <WrappedComponent {...props} />
        // }
    }
}

export default withAuthentication