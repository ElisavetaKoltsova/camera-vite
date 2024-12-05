export type ReviewToPost = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type Review = ReviewToPost & {
  id: string;
  createAt: string;
};


