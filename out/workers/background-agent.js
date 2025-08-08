// Background Agent Worker for persistent memory and session management
let sessionData = {}
let memoryStore = {}
let saveInterval = null

self.onmessage = function(event) {
  const { type, data } = event.data

  switch (type) {
    case 'INIT':
      // Initialize the background agent
      console.log('Background agent initialized')
      
      // Set up periodic save (every 30 seconds)
      saveInterval = setInterval(() => {
        self.postMessage({
          type: 'PERIODIC_SAVE',
          data: {
            session: sessionData,
            memory: memoryStore,
            timestamp: Date.now()
          }
        })
      }, 30000)
      break

    case 'UPDATE_SESSION':
      sessionData = { ...sessionData, ...data }
      self.postMessage({
        type: 'SESSION_UPDATE',
        data: sessionData
      })
      break

    case 'SAVE_MEMORY':
      memoryStore = { ...memoryStore, ...data }
      self.postMessage({
        type: 'MEMORY_UPDATE',
        data: memoryStore
      })
      break

    case 'GET_SESSION':
      self.postMessage({
        type: 'SESSION_RESPONSE',
        data: sessionData
      })
      break

    case 'CLEAR_SESSION':
      sessionData = {}
      memoryStore = {}
      self.postMessage({
        type: 'SESSION_CLEARED',
        data: null
      })
      break
  }
}

// Handle worker termination
self.onclose = function() {
  if (saveInterval) {
    clearInterval(saveInterval)
  }
}
