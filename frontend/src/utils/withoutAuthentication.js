import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const withoutAuthentication = (WrappedComponent) => {
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
            return <WrappedComponent {...props} />
        }

        // if (isAuthenticated === true) {
        return <Navigate to='/chat' replace />
        // }
    }
}

export default withoutAuthentication