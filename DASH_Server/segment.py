import os
import json
import datetime
import subprocess

def getLength(filename):
    result = subprocess.Popen(["ffprobe", filename],
    stdout = subprocess.PIPE, stderr = subprocess.STDOUT)
    return [x for x in result.stdout.readlines() if b"Duration" in x]
def get_sec(time_str):
    h, m, s = time_str.split(':')
    return float(h) * 3600 + float(m) * 60 + float(s)

path_videos = "videos/"
directories = [ name for name in os.listdir(path_videos) if os.path.isdir(os.path.join(path_videos, name)) ]

for dir in directories:
    with open('videos/'+dir+'/gt_'+dir+'.json') as f:
        a = getLength('videos/'+dir+'/'+dir+'.mp4')
        duration = (a[0].split(b': ')[1].split(b',')[0].decode())

        data = json.load(f)
        count = 0
        cut_time = []
        for key in data:
            cut_time.append(int(key))
        cut_time.append(int(get_sec(duration)))
        cut_time = sorted(cut_time)
        for i in range(len(cut_time)- 1):
            path_topic_dir = 'videos/'+dir+'/topic'+str(i)

            if (not os.path.isdir(path_topic_dir)):
                os.mkdir(path_topic_dir)
            ss = datetime.timedelta(seconds=int(cut_time[i]))
            t = datetime.timedelta(seconds=(int(cut_time[i+ 1]) - int(cut_time[i])))
            print(ss, t)
            os.system("ffmpeg -i " + "videos/" +dir+'/'+dir+'.mp4' + " -ss "+ str(ss)+  " -t "+ str(t)+" -async 1 "+path_topic_dir+"/" +"cut.mp4")
            os.system("MP4Box -dash 5000 -frag-rap -bs-switching no -profile live "+path_topic_dir+"/" +"cut.mp4#video "+path_topic_dir+"/" +"cut.mp4#audio -out "+path_topic_dir+"/"+ "topic_dash_"+str(i) +".mpd")
