export interface More {
  title: string;
  value: string;
}

export interface Network {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  type: 'Person' | 'Organisation' | '';
  more: More[];
}

export class NetworkClass implements Network {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  type: 'Person' | 'Organisation' | '';
  more: More[];
  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    type: 'Person' | 'Organisation' | '',
    relationship: string,
    avatar: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.type = type;
    this.avatar = avatar;
    this.more = [
      {
        title: 'Relationship',
        value: relationship
      }
    ];
  }
}

export interface NetworkApiType {
  Id: string;
  UserId: string;
  ContactId: string;
  Name: string;
  Email: string;
  Phone: string;
  CallForSupport: boolean;
  Address: string;
  Type: 'Person' | 'Organisation' | '';
  Relationship: string;
  Image: string;
}

export interface ShareNetworkApi {
  SharedWithNetworkContactId: string;
  SharedWithNetworkName: string;
  SharedOnDate: string;
}

export interface NetworkRootType {
  invitations: string[];
  networks: Network[];
  loading: boolean;
}
