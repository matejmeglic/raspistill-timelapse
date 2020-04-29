import time
import os
import shutil
import datetime
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler



class TestEventHandler(PatternMatchingEventHandler):
    def __init__(self, *args, **kwargs):
        super(TestEventHandler, self).__init__(*args, **kwargs)
        self.last_created = None
    def on_modified(self, event):
        if datetime.datetime.now() > datum:
            path = event.src_path        
            if path != self.last_created:
                print(str(datetime.datetime.now()) + " " + str(event) + " "+ str(self.last_created))
                self.last_created = path
                datum = datetime.datetime.now()
if __name__ == '__main__':

    path = "/home/pi/camera/www/"
    target = "/home/pi/raspistill-timelapse/public/img/latest_image.jpg"
    src = "/home/pi/camera/www/latest_image.jpg"
    datum = datetime.datetime(2007, 12, 6, 16, 29, 43, 79043)


    event_handler = TestEventHandler(patterns=["*.jpg"])
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()

    shutil.copy2(src, target)    

    try:
       while True:
           time.sleep(1)
    except KeyboardInterrupt:
       observer.stop()
    observer.join()