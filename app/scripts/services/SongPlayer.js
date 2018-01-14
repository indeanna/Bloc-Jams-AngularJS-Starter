(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

    /*@desc Buzz object audio file
    *@type {object}
    */
    var currentBuzzObject = null;

    /*
      *@function setSong
      *@desc stops currently playing song and loads new audio file as currentBuzzObject
      *@param {object} song
      */

    var setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
      });
    SongPlayer.currentSong = song;
    };
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    }
/*@function playSong
  @desc Plays current song and set song.playing to true.
  @parm {object} song
*/
    var playSong = function (song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    SongPlayer.currentSong = null;
  /*@function SongPlayer.play
    @desc pLays currrent song if paused, or plays clicked song.
    @parm {object} song
  */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong || currentAlbum.songs[0];
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
      }
    };

  /*@function SongPlayer.pause
    @desc Pauses current song.
    @parm {object} song
  */
    SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
    };

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop()
        SongPlayer.currentSong.playing = null;
      } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
