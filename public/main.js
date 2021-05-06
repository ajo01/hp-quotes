
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Harry Potter',
            quote: ' There is no justice in the laws of nature, no term for fairness in the equations of motion. The Universe is neither evil, nor good, it simply does not care. The stars don`t care, or the Sun, or the sky. But they don`t have to! WE care! There IS light in the world, and it is US!'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Harry Potter'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No quote to delete') {
                messageDiv.textContent = 'No Dumbledore or Voldemort quote to delete'
            } else {
                window.location.reload(true)
            }
        })
        .catch(console.error)
})
