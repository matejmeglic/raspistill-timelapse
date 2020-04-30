import os
import os.path
import shutil
import time
import datetime
from os import listdir, path
from os.path import isfile, join

logCounter = 0
  
while True:
   
    #img
    initPath = "/home/pi/raspistill-timelapse/public/img/"
    if path.isdir(initPath) is False :
        os.mkdir(initPath)
    onlyFiles = [f for f in listdir(initPath) if isfile(join(initPath, f))]

    if len(onlyFiles)>1 :
        while len(onlyFiles)>1 :
           
            if onlyFiles[0] > onlyFiles[1] :
                os.system("rm "+initPath+onlyFiles[1])
                onlyFiles.remove(onlyFiles[1])
            else :
                os.system("rm "+initPath+onlyFiles[0])
                onlyFiles.remove(onlyFiles[0])
   
            os.system("git add "+initPath)
            print("add")
            os.system("git commit -m 'upload "+onlyFiles[0]+"'")
            print("commit")
            os.system("git push -u origin master")
            print("Git push - file "+onlyFiles[0]+" updated successfully!")
    else :
        print("IMG - No changes - "+ str(len(onlyFiles)) +" image in the IMG folder!")
    
    #Logs
    initPathLogs = "/home/pi/raspistill-timelapse/public/logs/"
    if path.isdir(initPathLogs) is False :
        os.mkdir(initPathLogs)
    onlyFilesLogs = [f for f in listdir(initPathLogs) if isfile(join(initPathLogs, f))]



    #on change logs push
    if len(onlyFilesLogs)>logCounter :
        os.system("git add "+initPathLogs)
        print("add logs")
        os.system("git commit -m 'upload logs'")
        print("commit logs")
        os.system("git push -u origin master")
        print("Git push - logs updated successfully!")    
        logCounter = len(onlyFilesLogs)


    else :
        print("LOGS - No changes - "+ str(len(onlyFilesLogs)) +" logs in the LOG folder!")

    time.sleep(10)