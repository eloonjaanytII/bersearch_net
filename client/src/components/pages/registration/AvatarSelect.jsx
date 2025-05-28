import React from 'react'

const avatarPool = [
  {src: '/icon-animals/bear-icon.png'},
  {src: '/icon-animals/bug-icon.png'},



]


const AvatarSelect = () => {
  return (
    <div className='flex w-full'>
      <div className='w-1/2'>
        {
          avatarPool.map((picture, index) => (
            <img src={picture.src} key={index} alt='picture'/>
          ))
        }
      </div>
      <div className='w-1/2'>
        {
          avatarPool.map((picture, index) => (
            <img src={picture.src} key={index} alt='picture'/>
          ))
        }
      </div>
    </div>
  )
}

export default AvatarSelect