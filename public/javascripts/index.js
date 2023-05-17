const handleAdd = () => {
  console.log('1111111')
  fetch('/users/add?type=7', {
    method: 'post',
    body: JSON.stringify({ value: 1 }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data=> {
    console.log('data------', data)
  }).catch(err => {
    console.log('err------', err)
  })
 
}