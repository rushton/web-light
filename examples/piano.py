import time
import httplib

class Piano(object):
   NOTE_DURATIONS = {'w': 240, 'h': 120, 'q': 60, 'e': 30, 's': 15}
   NOTES = {"C0":"16","C#0":"17","D0":"18","D#0":"19","E0":"20","F0":"21","F#0":"23","G0":"24","G#0":"25","A0":"27","A#0":"29","B0":"30","C1":"32","C#1":"34","D1":"36","D#1":"38","E1":"41","F1":"43","F#1":"46","G1":"49","G#1":"51","A1":"55","A#1":"58","B1":"61","C2":"65","C#2":"69","D2":"73","D#2":"77","E2":"82","F2":"87","F#2":"92","G2":"98","G#2":"103","A2":"110","A#2":"116","B2":"123","C3":"130","C#3":"138","D3":"146","D#3":"155","E3":"164","F3":"174","F#3":"185","G3":"196","G#3":"207","A3":"220","A#3":"233","B3":"246","C4":"261","C#4":"277","D4":"293","D#4":"311","E4":"329","F4":"349","F#4":"369","G4":"392","G#4":"415","A4":"440","A#4":"466","B4":"493","C5":"523","C#5":"554","D5":"587","D#5":"622","E5":"659","F5":"698","F#5":"739","G5":"783","G#5":"830","A5":"880","A#5":"932","B5":"987","C6":"1046","C#6":"1108","D6":"1174","D#6":"1244","E6":"1318","F6":"1396","F#6":"1479","G6":"1567","G#6":"1661","A6":"1760","A#6":"1864","B6":"1975","C7":"2093","C#7":"2217","D7":"2349","D#7":"2489","E7":"2637","F7":"2793","F#7":"2959","G7":"3135","G#7":"3322","A7":"3520","A#7":"3729","B7":"3951","C8":"4186","C#8":"4434","D8":"4698","D#8":"4978"}

   def __init__(self,signature, tempo):
      self.signature = signature
      self.tempo = tempo
   def playSequence(self,sequence):
      for note in sequence:
         print "playing" + str(note)
         self.playNote(note)
   def playNote(self, note):
      duration = float(self.NOTE_DURATIONS[note['duration']])/float(self.tempo)
      conn = httplib.HTTPConnection('localhost', 20715)
      conn.request('GET', '/play/%s/%s' % (self.NOTES[note['note']], duration))
      conn.close()
      print "sleeping for " + str(duration)
      time.sleep(duration)

def test():
   seq = [{'note':'C3', 'duration':'q'},{'note':'D3', 'duration':'q'},{'note':'E3', 'duration':'q'}]
   piano = Piano('4/4', 60)
   piano.playSequence(seq)

if __name__ == "__main__":
   test()
