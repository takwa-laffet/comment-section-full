export function reducer(state, action) {
    const comment = state.byId[action.id]

    switch (action.type) {
        case 'CREATE_REPLY':
            console.log(comment)
            return state

        case 'INCREMENT_SCORE':
            const clone = structuredClone(state)
            
            clone.byId[action.id] = {
                ...comment,
                score: comment.score + 1
            }

            return clone

        default:
            return state
    }
  }