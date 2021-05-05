const updateBtn = document.querySelector('#update-button')

updateBtn.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Harry Potter',
            quote: 'And someday when the descendants of humanity have spread from star to star they won’t tell the children about the history of Ancient Earth until they’re old enough to bear it and when they learn they’ll weep to hear that such a thing as Death had ever once existed'
        })
    })
})
