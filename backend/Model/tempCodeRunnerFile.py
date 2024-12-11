from nltk.sentiment import SentimentIntensityAnalyzer
# from tqdm import tqdm

# plt.style.use('ggplot')


# df = pd.read_csv('./reviews.csv')
# print(df.head(50))

# sia = SentimentIntensityAnalyzer()
# st = sia.polarity_scores('I am so happy!')
# print(st)

# res = {}
# for i, row in tqdm(df.iterrows(), total=len(df)):
#     text = row['ReviewText']
#     iid = row['ReviewID']
#     temp = sia.polarity_scores(text)
#     temp['Likes'] = row['Likes']
#     res[iid] = temp

# print(res)
# data = res
# vader = pd.DataFrame(res).T
# vader = vader.reset_index().rename(columns={'index': 'Id'})
# print(vader.head(50))

# fig, axs = plt.subplots(1, 3, figsize=(12, 3))
# sns.barplot(data=vader, x='Likes', y='pos', ax=axs[0])
# sns.barplot(data=vader, x='Likes', y='neu', ax=axs[1])
# sns.barplot(data=vader, x='Likes', y='neg', ax=axs[2])
# axs[0].set_title('Positive')
# axs[1].set_title('Neutral')
# axs[2].set_title('Negative')
# plt.tight_layout()


# neu_total = sum(entry['neu'] for entry in data.values())
# pos_total = sum(entry['pos'] for entry in data.values())
# neg_total = sum(entry['neg'] for entry in data.values())

# # Prepare data for the pie chart
# labels = ['Neutral', 'Positive', 'Negative']
# sizes = [neu_total, pos_total, neg_total]
# colors = ['#ffcc99', '#66b3ff', '#99ff99']

# # Plotting the pie chart
# plt.figure(figsize=(8, 6))
# plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140, colors=colors)
# plt.title('Sentiment Analysis Distribution (Neutral, Positive, Compound)')
# plt.show()

# plt.show()