export interface Profile {
  userId: string;
  safetyPlanId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  gender: string;
  dob: string;
}

export class ProfileClass implements Profile {
  userId: string;
  safetyPlanId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  gender: string;
  dob: string;
  constructor(
    userId: string,
    safetyPlanId: string,
    firstName: string,
    lastName: string,
    preferredName: string,
    gender: string,
    dob: string
  ) {
    this.userId = userId;
    this.safetyPlanId = safetyPlanId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.preferredName = preferredName;
    this.gender = gender;
    this.dob = dob;
    this.email = '';
    this.state = '';
    this.avatar = '/images/avatars/avatar_0.png';
    this.phone = '';
    this.country = '';
  }
}

export interface ProfileApiType {
  UserId: string;
  SafetyPlanId: string;
  FirstName: string | null;
  Surname: string | null;
  PreferredName: string | null;
  Gender: string | null;
  DateOfBirth: string | null;
}

export interface Emergency {
  id: 1;
  title: string;
  action: string[];
}

export interface ProfileRootType {
  invited: boolean;
  profile: Profile | null;
}
