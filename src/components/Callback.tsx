import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from '../lib/spotify'

interface CallbackProps {
  setToken: (newToken: string) => void;
  onError: (errorMessage: string) => void;
}

function Callback({ setToken, onError }: CallbackProps) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      if (isProcessing) return
      setIsProcessing(true)

      console.log('Callback component mounted');
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      console.log("Authorization code:", code)

      if (code) {
        try {
          const data = await getAccessToken(code)
          console.log('Access token data:', data);
          if (data.error) {
            console.error("Error in response:", data.error, data.error_description)
            onError(data.error_description)
          } else {
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            setToken(data.access_token)
            navigate('/', { replace: true })
          }
        } catch (error) {
          console.error("Error getting access token:", error)
          navigate('/', { replace: true })
        }
      } else {
        console.error("No authorization code found in URL")
        navigate('/', { replace: true })
      }
    }

    fetchToken()
  }, [navigate, setToken, isProcessing, onError])

  return <div>Processing login...</div>
}

export default Callback