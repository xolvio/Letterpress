describe('Video Chapter Template', function () {

  describe('Created', function () {

    it('sets the videoLocation to the preview video when the premium video is not available', function () {

      // SETUP
      var thisContext = {
        data: {
          previewVideo: 'someLocation',
          premiumVideo: null
        }
      };

      // EXECUTE
      Template.videoChapter.created.apply(thisContext);

      // VERIFY
      expect(thisContext.videoLocation.get()).toBe('someLocation');

    });

    it('sets the videoLocation to the signed URL when the premium video is available', function () {

      // SETUP
      var thisContext = {
        data: {
          previewVideo: null,
          premiumVideo: 'someLocation'
        }
      };
      spyOn(Meteor, 'call').and.callFake(function (method, url, callback) {
        var fakeError    = null,
            fakeResponse = 'aSignedUrl';
        callback(fakeError, fakeResponse)
      });

      // EXECUTE
      Template.videoChapter.created.apply(thisContext);

      // VERIFY
      expect(thisContext.videoLocation.get()).toBe('aSignedUrl');

    });


  });

  describe('Helpers', function () {

    describe('videoUrl', function () {

      it('returns the the videoLocation', function () {

        // SETUP
        spyOn(Template, 'instance').and.returnValue({
          videoLocation: {
            get: function () {
              return 'itCalledThisGuy'
            }
          }
        });

        // EXECUTE
        var result = Template.videoChapter.__helpers.get('videoUrl')();

        // VERIFY
        expect(result).toEqual('itCalledThisGuy');

      });

      it('calls load on the video on the next tick', function (done) {

        // SETUP
        spyOn(Template, 'instance').and.returnValue({
          videoLocation: {get: function () { /* noop */}}
        });

        spyOn(window, '$').and.returnValue([{
          load: function() {
            // VERIFY (if the load isn't called, this test will timeout)
            done();
          }
        }]);

        // EXECUTE
        var result = Template.videoChapter.__helpers.get('videoUrl')();

      });

    });

  });


});