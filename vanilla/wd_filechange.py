import os
import shutil
import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler



def on_modified(event):

    if event.is_directory== False and event.src_path == "/home/pi/camera/www/latest_image.jpg":
        print(f"{event.src_path} has been modified")
       
        source = "/home/pi/camera/www/latest_image.jpg"
        
        destination = "/home/pi/raspistill-timelapse/src/img/latest_image.jpg"

        shutil.copyfile(source, destination) 
        print("File copied successfully.") 
        os.system("git add /home/pi/raspistill-timelapse")
        os.system("git commit -m '4'")
        os.system("git push -u original master")
        print("git push")



if __name__ == "__main__":

    # Create an event handler
    patterns = "*"
    ignore_patterns = ""
    ignore_directories = False
    case_sensitive = True

    # Define what to do when some change occurs 
    my_event_handler = PatternMatchingEventHandler(patterns, ignore_patterns, ignore_directories, case_sensitive) 
    my_event_handler.on_modified = on_modified


    # Create an observer
    path = "/home/pi/camera/www/"
    go_recursively = True

    my_observer = Observer()
    my_observer.schedule(my_event_handler, path, recursive=go_recursively)

    # Start the observer
    my_observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        my_observer.stop()
    my_observer.join() 