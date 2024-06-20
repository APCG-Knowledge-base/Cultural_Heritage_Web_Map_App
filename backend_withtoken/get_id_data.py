import sys
import urllib.parse
import urllib.request
import json

def get_building_data(id):
    base_url = f"https://reukraine.shtab.net/api/v1/building/{id}"
    print(base_url)
    with urllib.request.urlopen(base_url) as response:
        data = response.read().decode('utf-8')
        return json.loads(data)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No ID provided")
        sys.exit(1)
    id = sys.argv[1]
    data = get_building_data(id)
    print(json.dumps(data))  # Output the data as a JSON string