const ReviewList = ({data}) => {
  return (
    <div className>
            <ul>
                {data?.reviews?.map(item => (
                    <li key={item.id} className='border-b-2'>
                        Рецензия №{item.id} <br />
                        {item.title}<br />
                        {item.content}
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default ReviewList