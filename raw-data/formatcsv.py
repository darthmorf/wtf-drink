import csv

prompts = []

with open('picolo.csv', encoding='utf8') as csv_file:
    csv_reader = csv.reader(csv_file, quotechar='"', delimiter=',')

    rawcsvs = []
    for row in csv_reader:
      rawcsvs.append(row)

    i = 0
    while i < len(rawcsvs):
      row = rawcsvs[i]
      
      if "en" in row:

        prompt = '{ type:"'
        rawprompt = row[2]
                
        j = 0
        while "%s" in rawprompt:
          rawprompt = rawprompt.replace("%s", "@" + str(j), 1)
          j += 1
        rawprompt = rawprompt.replace("$", "%")
        rawprompt = rawprompt.replace('"', "")
        
        
        if row[1] == "1" or row[1] == "5" or row[1] == "6" or row[1] == "25":          
          prompt += 'prompt", title:"", body:"' + rawprompt + '"},'
          prompts.append(prompt)


        elif row[1] == "2" or row[1] == "3":
          key = row[3]
          j = 1
          resps = []
          loop = True
          while loop:
            if rawcsvs[i+j][4] != key:
              loop = False
            else:
              j += 1
              resps.append(rawcsvs[i+j])

          if len(resps) != 1:
            i += j + 1
            continue
          
          virusresolution = rawcsvs[i+1][2]
          j = 0
          while "%s" in virusresolution:
            virusresolution = virusresolution.replace("%s", "@" + str(j), 1)
            j += 1
          virusresolution = virusresolution.replace("$", "%")
          virusresolution = virusresolution.replace('"', "")

          
          prompt += 'virus", title:"Virus", body:"' + rawprompt + '", resolution:"' + virusresolution + '"},'
          prompts.append(prompt)
          i += 1


        elif row[1] == "4" or row[1] == "14" or row[1] == "24":
          prompt += 'game", title:"Game", body:"' + rawprompt + '"},'
          prompts.append(prompt)

      i += 1


for row in prompts:
  row = row.replace("f*cking", "fucking")
  print(row)
      


