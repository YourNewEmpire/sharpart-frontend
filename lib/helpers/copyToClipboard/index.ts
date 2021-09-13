import { toast, Zoom} from 'react-toastify';

const  copyToBoard = (text: string) => {
      navigator.clipboard.writeText(text).then(
            function () {
                  toast.info( 'copied: ' + text , {
                        position: "top-right",
                        autoClose: 3000,
                        transition: Zoom,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                  })
            }
      )
}
export default copyToBoard