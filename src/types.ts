export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'fish' | 'other';
  age: string;
  location: string;
  description: string;
  imageUrl: string;
  status: 'lost' | 'found' | 'adoption';
  contactInfo: string;
  createdAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  pets: Pet[];
}