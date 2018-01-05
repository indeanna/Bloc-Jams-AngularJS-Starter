(function() {
  function SongPlayer() {
    var SongPlayer = {};
    var currentSong = null;
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
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
    });
      currentSong = song;
    };
/*@function playSong
  @desc Plays current song and set song.playing to true.
  @parm {object} song
*/
    var playSong =function (song) {
      currentBuzzObject.play();
      song.playing = true;
    };

  /*@function SongPlayer.play
    @desc pLays currrent song if paused, or plays clicked song.
    @parm {object} song
  */
    SongPlayer.play = function(song) {
      if(currentSong !== song) {
        setSong(song);
        playSong(song);

      } else if (currentSong === song) {
          if(currentBuzzObject.isPaused());
            currentBuzzObject.play();
          }
      };


  /*@function SongPlayer.pause
    @desc Pauses current song.
    @parm {object} song
  */
    SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
