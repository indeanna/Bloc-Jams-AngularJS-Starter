(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

    /*@desc Which album is playing. Used for next and prvious functions
      @type {object}*/
    var currentAlbum = Fixtures.getAlbum();

    /*@desc Buzz object audio file
    *@type {object}*/
    var currentBuzzObject = null;

    /*@function setSong
      *@desc stops currently playing song and loads new audio file as currentBuzzObject
      *@param {object} song*/
    var setSong = function(song) {
      if(currentBuzzObject) {
      stopSong();
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });
    SongPlayer.currentSong = song;
    };

    /*@function getSongIndex
      @desc Gets song index for use or previous and next functions
      @parm {object} song*/
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

/*@function playSong
  @desc Plays current song and set song.playing to true.
  @parm {object} song*/
    var playSong = function (song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /*@function stopSong
      @desc Stops the currently playing song
      @parm {object} song*/
    var stopSong = function (song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /*@desc variable that that sets song object
      @parm {object} song*/
    SongPlayer.currentSong = null;

    /*@desc Current playback time (in seconds) of currently playing song
      @type {number} */
    SongPlayer.currentTime = null;

  /*@function SongPlayer.play
    @desc pLays currrent song if paused, or plays clicked song.
    @parm {object} song */
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
    @parm {object} song */
    SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
    }
    /*@function SongPlayer.previous
      @desc Sets song previous to currrent song.  Stops playing song if no previous song.
      @parm {object} song*/
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
           stopSong();
        } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
      }
    /*@function SongPlayer.next
      @desc Plays the next song in the array after the current song.  Stops playing music if no next song.
      @parm {object} song*/
    SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;

        if (currentSongIndex > currentAlbum.songs.length-1) {
          stopSong();
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
      }
     }
     /*@function setCurrentTime
       @desc Set current time (in seconds) of surrently playing song
       @parm {number} time*/
     SongPlayer.setCurrentTime = function(time) {
       if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
       }
     };
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures',  SongPlayer]);
})();
