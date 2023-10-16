"""USE ALPHA VANTAGE API TO GET WEEKLY STOCK DATA AND PLOT IN A GRAPH"""

API_KEY = 'LAF38PQTJH8ADGQX'    
STOCK_SYMBOL = 'MSFT'           # Microsoft

import requests;
import pandas as pd;
import matplotlib.pyplot as plt

def get_weekly_stock_data(symbol:str):
    """Get weekly stock data from Alpha Vantage API"""
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol={symbol}&apikey={API_KEY}'.format(symbol=symbol, API_KEY=API_KEY);
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None
    
def main():
    """Main function"""
    data = get_weekly_stock_data(STOCK_SYMBOL)
    #print(data)

    #turn this into a pandas dataframe
    df = pd.DataFrame.from_dict(data['Weekly Time Series'], orient='index');
    df.index = pd.to_datetime(df.index);
    df = df.astype(float);
    print(df)

    #plot the data into a graph
    df['4. close'].plot();
    plt.title('Weekly Stock Data for ' + STOCK_SYMBOL);
    plt.show();

    #plt.plot(data)
    #plt.show()
    
if __name__ == '__main__':
    main()

