export type Dragon = {
  id: number;
  name: string;
  image: string;
  frontImage: string;
};

export type DragonId = Dragon["id"];

export type DragonOrder = DragonId[];

export type DragonSlotIndex = number;
