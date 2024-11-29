import React from 'react'

function SearchSvg({ color = '#BABABA', height = '20px', width = '20px' }) {
    return (
        <div style={{ height, width }} className='bg-transparent flex'>

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M16.5286 15.232L20.4544 19.1579L19.158 20.4542L15.2322 16.5284C13.8207 17.6577 12.0305 18.3333 10.0835 18.3333C5.5295 18.3333 1.8335 14.6373 1.8335 10.0833C1.8335 5.52931 5.5295 1.83331 10.0835 1.83331C14.6375 1.83331 18.3335 5.52931 18.3335 10.0833C18.3335 12.0303 17.6579 13.8205 16.5286 15.232ZM14.6895 14.5519C15.8104 13.3967 16.5002 11.8209 16.5002 10.0833C16.5002 6.5381 13.6287 3.66665 10.0835 3.66665C6.53829 3.66665 3.66683 6.5381 3.66683 10.0833C3.66683 13.6285 6.53829 16.5 10.0835 16.5C11.8211 16.5 13.3969 15.8102 14.5521 14.6893L14.6895 14.5519Z" fill={`${color}`} />
                <path d="M16.5286 15.232L20.4544 19.1579L19.158 20.4542L15.2322 16.5284C13.8207 17.6577 12.0305 18.3333 10.0835 18.3333C5.5295 18.3333 1.8335 14.6373 1.8335 10.0833C1.8335 5.52931 5.5295 1.83331 10.0835 1.83331C14.6375 1.83331 18.3335 5.52931 18.3335 10.0833C18.3335 12.0303 17.6579 13.8205 16.5286 15.232ZM14.6895 14.5519C15.8104 13.3967 16.5002 11.8209 16.5002 10.0833C16.5002 6.5381 13.6287 3.66665 10.0835 3.66665C6.53829 3.66665 3.66683 6.5381 3.66683 10.0833C3.66683 13.6285 6.53829 16.5 10.0835 16.5C11.8211 16.5 13.3969 15.8102 14.5521 14.6893L14.6895 14.5519Z" fill={`${color}`} />
            </svg>
        </div>

    )
}

export default SearchSvg