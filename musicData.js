const Store = require('electron-store')
const uuidv4 = require('uuid/v4');
const path = require('path')
class DataStore extends Store {
    constructor(settings){
        super(settings)
        this.track = this.get('track') || []
    }
    saveTrack () {
        this.set('track', this.track)
        return this
    }
    getTrack () {
        return this.get('track') || []
    }
    addTrack (tracks) {
        let trackWithPros = tracks.map(track =>{
            return {
                id: uuidv4(),
                path: track,
                fileName: path.basename(track)
            }
        }).filter(track =>{
            const currentTracksPath = this.getTrack().map(track => track.path)
            return currentTracksPath.indexOf(track.path) < 0
        })
        this.track = [...this.track,...trackWithPros]
        return this.saveTrack()
    }
    deleteTrack (id){
        this.track = this.track.filter(item => item.id !== id)
        return this.saveTrack()
    }
}
exports.DataStore = DataStore