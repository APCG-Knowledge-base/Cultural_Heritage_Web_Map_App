import urllib.request
import json

def fetch_data():
    base_url = "https://www.saveecobot.com/en/maps/marker.json"
    params = {
        'marker_id': 17113,
        'marker_type': 'device',
        'pollutant': 'no2_ppb',
        'pollutant_unit': '',
        'is_wide': 1,
        'is_iframe': 0,
        'is_widget': 0,
        'rand': '2024-07-01T12-25'
    }

    # Construct the full URL with parameters
    full_url = base_url + '?' + urllib.parse.urlencode(params)

    try:
        # Send the request
        with urllib.request.urlopen(full_url) as response:
            # Read and decode the response
            data = response.read().decode('utf-8')
            # Parse JSON data
            json_data = json.loads(data)
            return json_data

    except urllib.error.HTTPError as e:
        print(f'HTTP error occurred: {e.code} - {e.reason}')
    except urllib.error.URLError as e:
        print(f'URL error occurred: {e.reason}')
    except Exception as e:
        print(f'Other error occurred: {str(e)}')

    return None

if __name__ == "__main__":
    data = fetch_data()
    if data:
        print(json.dumps(data, indent=2))  # Output the data as a formatted JSON string
    else:
        print('Failed to fetch data')