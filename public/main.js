
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Harry Potter',
            quote: 'And someday when the descendants of humanity have spread from star to star they won’t tell the children about the history of Ancient Earth until they’re old enough to bear it and when they learn they’ll weep to hear that such a thing as Death had ever once existed'
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
