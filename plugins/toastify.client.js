import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            toast: (text, click) => {
                Toastify({
                    text,
                    duration: 3000,
                    newWindow: false,
                    close: false,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                        maxWidth:  "calc(100% - 20px)",
                        borderRadius:"24px",
                        fontSize: "14px"
                    },
                    onClick: click
                }).showToast();
            },
            toastInfo: (text, click) => {
                Toastify({
                    text,
                    duration: 3000,
                    newWindow: false,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #FFA500, #FFD700)",
                        borderRadius:"24px",
                        width: "calc(100% - 20px)",
                        fontSize: "14px"
                    },
                    onClick: click
                }).showToast();
            },
            toastError: (text, click) => {
                Toastify({
                    text: text || "Сбой сервера",
                    duration: 3000,
                    newWindow: false,
                    close: false,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #FF4500, #FF0000)",
                        borderRadius:"24px",
                        width: "calc(100% - 20px)",
                        fontSize: "14px"
                    },
                    onClick: click
                }).showToast();
            }
        }
    }
})