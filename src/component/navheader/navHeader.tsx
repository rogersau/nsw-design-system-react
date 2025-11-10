import './navHeader.css'
interface PageHeadingProps {
  backPath?: string
  homePath?: string
  PageTitle: string
  /** optional - if provided the back icon will be shown and this will be called when used */
  onBackScreen?: () => void
  /** Optional navigation callback - router agnostic. Receives path (no leading slash added). */
  onNavigate?: (path: string) => void
}

export default function PageHeading(props: PageHeadingProps) {

  const homePath = props.homePath ?? '/'

  const handleBackClick = () => {
    if (!props.backPath) return
    const path = props.backPath
    if (props.onNavigate) {
      props.onNavigate(path)
    } else {
      props.onBackScreen && props.onBackScreen()
    }
  }

  const handleCloseClick = () => {
    const path = homePath
    if (props.onNavigate) {
      props.onNavigate(path)
    } else {
      props.onBackScreen && props.onBackScreen()
    }
  }

  return (
    <>
      <div>
        <div className='nsw-col nsw-col-sm-12 nsw-col-lg-12 page-header nsw-border--bottom nsw-border--brand-dark'>
          <div className='nsw-docs__box'>
            {props.onBackScreen ? (
              <button
                type='button'
                className='nsw-icon-button'
                onClick={handleBackClick}
                aria-label='Back'
              ><span className="material-icons nsw-material-icons nsw-material-icons--30">
                
                arrow_back

              </span>
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className='nsw-docs__box page-heading-title'>
            {props.PageTitle}
          </div>
          <div className='nsw-docs__box'>
            <button
              type='button'
              className='nsw-icon-button'
              onClick={handleCloseClick}
              aria-label='Close'
            > <span className="material-icons nsw-material-icons nsw-material-icons--30">close</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
