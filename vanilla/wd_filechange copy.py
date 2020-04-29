import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

def on_created(event):
    # This function is called when a file is created
    
    if event.src_path == "/home/pi/camera/www/latest_image.jpg":
        print(f"hey, {event.src_path} has been created!")
        # Python program to explain shutil.copyfile() method  
    
        # importing shutil module  
        import shutil 
        
        # Source path 
        source = "/home/pi/camera/www/latest_image.jpg"
        
        # Destination path 
        destination = "/home/pi/raspistill-timelapse/public/img/latest_image.jpg"
        
        # Copy the content of 
        # source to destination 
        
        try:
            shutil.copyfile(source, destination) 
            print("File copied successfully.") 
        
        # If source and destination are same 
        except shutil.SameFileError: 
            print("Source and destination represents the same file.") 
        
        # If destination is a directory. 
        except IsADirectoryError: 
            print("Destination is a directory.") 
        
        # If there is any permission issue 
        except PermissionError: 
            print("Permission denied.") 
        
        # For other errors 
        except: 
            print("Error occurred while copying file.") 

def on_deleted(event):
    # This function is called when a file is deleted
    print(f"what the f**k! Someone deleted {event.src_path}!") 

def on_modified(event):
    # This function is called when a file is modified
    print(f"hey buddy, {event.src_path} has been modified")

def on_moved(event):
    # This function is called when a file is moved    
    print(f"ok ok ok, someone moved {event.src_path} to {event.dest_path}") 

if __name__ == "__main__":

    # Create an event handler
    patterns = "*"
    ignore_patterns = ""
    ignore_directories = False
    case_sensitive = True

    # Define what to do when some change occurs 
    my_event_handler = PatternMatchingEventHandler(patterns, ignore_patterns, ignore_directories, case_sensitive)
    my_event_handler.on_created = on_created
    my_event_handler.on_deleted = on_deleted 
    my_event_handler.on_modified = on_modified
    my_event_handler.on_moved = on_moved 

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