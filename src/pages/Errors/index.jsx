import { useParams, Link } from 'react-router'
const ErrorPage = () => {
  let { errorId } = useParams()
  if (!errorId) errorId = '404'

  const errorMessages = {
    401: 'Utilisateur non authentifié',
    403: 'Accès refusé',
    404: "Oups! La page que vous demandez n'existe pas.",
    500: 'Erreur interne du serveur',
    502: 'Erreur de passerelle',
    503: 'Service indisponible',
    504: 'Délai d’attente de la passerelle dépassé'
  }
  
  const errorMessage = errorMessages[errorId] || 'Erreur inconnue'
  return (
    <div className='container-flex error-page flex-column flex-center'>
      <h1 className='error-number'>{errorId}</h1>
      <p className='error-message'>{errorMessage}</p>
      <Link className='error-link' to={'/'}>
        Retournez sur la page d'accueil
      </Link>
    </div>
  )
}
export default ErrorPage