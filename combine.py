#Script to combine all demographic csv into one file.

import shutil
import glob


path = r'data'
allFiles = glob.glob(path + "/CVP_demo_*.csv")
allFiles.sort()
with open('CVP_demo.csv', 'wb') as outfile:
    for i, fname in enumerate(allFiles):
        with open(fname, 'rb') as infile:
            if i != 0:
                infile.readline()
            shutil.copyfileobj(infile, outfile)
            print(fname + " has been copied.")


