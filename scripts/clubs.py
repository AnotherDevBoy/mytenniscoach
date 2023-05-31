from pykml import parser
import json

places = []

with open('locations.kml') as f:
  doc = parser.parse(f).getroot()
  for placemark in doc.Document.Folder.Placemark:
    places.append(placemark.name)

print(places)