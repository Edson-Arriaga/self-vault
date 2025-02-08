export type SectionNames = 'Memories' | 'Favorites' | 'Others'

export interface Category {
  id: string;
  name: string;
  image: any;
}

export const Sections : { [key in SectionNames]: Category[] } = {
  Memories: [
    { id: '1', name: 'Embarrassing Moments', image: require('../assets/images/embarrassing-moments.jpg')},
    { id: '2', name: 'Relationships', image: require('../assets/images/relationships.jpg') },
    { id: '3', name: 'Funny moments', image: require('../assets/images/funny-moments.jpg') },
    { id: '4', name: 'Adventures', image: require('../assets/images/adventures.jpg') },
    { id: '5', name: 'Memorable Encounters', image: require('../assets/images/memorable-encounters.jpg') },
    { id: '6', name: 'Lessons', image: require('../assets/images/lessons.jpg') },
    { id: '7', name: 'Challenges overcome', image: require('../assets/images/challenges-overcome.jpg') },
    { id: '8', name: 'Hard Moments', image: require('../assets/images/hard-moments.jpg') },
  ],
  Favorites: [
    { id: '9', name: 'Fav. Movies', image: require('../assets/images/fav-movies.jpg') },
    { id: '10', name: 'Fav. Series.', image: require('../assets/images/fav-series.jpg') },
    { id: '11', name: 'Fav. Songs', image: require('../assets/images/fav-songs.jpg') },
    { id: '12', name: 'Fav. Books', image: require('../assets/images/fav-books.jpg') },
    { id: '13', name: 'Fav. Places', image: require('../assets/images/fav-places.jpg') },
    { id: '14', name: 'Fav. Color', image: require('../assets/images/fav-color.jpg') },
    { id: '15', name: 'Fav. Number', image: require('../assets/images/fav-number.jpg') },
    { id: '16', name: 'Fav. Animals', image: require('../assets/images/fav-animals.jpg') }
  ],
  Others: [
    { id: '17', name: 'Quotes or phrases', image: require('../assets/images/quotes-or-phrases.jpg') },
    { id: '18', name: 'Guilty pleasures', image: require('../assets/images/guilty-pleasures.jpg') },
    { id: '19', name: 'Bucket List', image: require('../assets/images/bucket-list.jpg') },
    { id: '20', name: 'Jokes', image: require('../assets/images/jokes.jpg') },
    { id: '21', name: 'Fears', image: require('../assets/images/fears.jpg') },
    { id: '22', name: 'Your Heroes', image: require('../assets/images/your-heroes.jpg') },
    { id: '23', name: 'Dreams and Aspirations', image: require('../assets/images/dreams-and-aspirations.jpg') },
    { id: '24', name: 'Hobbies', image: require('../assets/images/hobbies.jpg') },
  ],
};
