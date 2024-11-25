import urllib.parse
import urllib.request
import json

def get_building_data(latitude, longitude, radius, page, building_type, region):
    base_url = "https://reukraine.shtab.net/api/v1/building/"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "radius": radius,
        "page": page,
        "type": building_type,
        "region": region
    }
    
    url = base_url + '?' + urllib.parse.urlencode(params)
    with urllib.request.urlopen(url) as response:
        data = response.read().decode('utf-8')
        return json.loads(data)

# Example usage:
latitude = 50.45110270786878
longitude = 30.51368519768905
radius = 4
page = 1
building_type = 32
region = 7

data = get_building_data(latitude, longitude, radius, page, building_type, region)
print(data)