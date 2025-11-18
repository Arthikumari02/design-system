export const EMPTY_STRING = ''
export const SPECIAL_CHARS_REGEX = /[^a-zA-z0-9\s]/

export const getAvatarProfileTextColor = (firstLetter: string) => {
   switch (firstLetter) {
      case 'A':
         return 'text-gray-slate-600'
      case 'B':
         return 'text-success-600'
      case 'C':
         return 'text-error-600'
      case 'D':
         return 'text-warning-600'
      case 'E':
         return 'text-blue-600'
      case 'F':
         return 'text-moss-600'
      case 'G':
         return 'text-green-light-600'
      case 'H':
         return 'text-green-600'
      case 'I':
         return 'text-teal-600'
      case 'J':
         return 'text-cyan-600'
      case 'K':
         return 'text-blue-light-600'
      case 'L':
         return 'text-blue-600'
      case 'M':
         return 'text-blue-dark-600'
      case 'N':
         return 'text-orange-600'
      case 'O':
         return 'text-indigo-600'
      case 'P':
         return 'text-violet-600'
      case 'Q':
         return 'text-purple-600'
      case 'R':
         return 'text-fuchsia-600'
      case 'S':
         return 'text-pink-600'
      case 'T':
         return 'text-rose-600'
      case 'U':
         return 'text-orange-dark-600'
      case 'V':
         return 'text-yellow-600'
      case 'W':
         return 'text-blue-dark-600'
      case 'X':
         return 'text-teal-600'
      case 'Y':
         return 'text-green-600'
      case 'Z':
         return 'text-moss-600'
      default:
         return 'text-green-light-600'
   }
}

export const getAvatarProfileBgColor = (firstLetter: string) => {
   switch (firstLetter) {
      case 'A':
         return 'bg-gray-slate-100'
      case 'B':
         return 'bg-success-100'
      case 'C':
         return 'bg-error-100'
      case 'D':
         return 'bg-warning-100'
      case 'E':
         return 'bg-blue-100'
      case 'F':
         return 'bg-moss-100'
      case 'G':
         return 'bg-green-light-100'
      case 'H':
         return 'bg-green-100'
      case 'I':
         return 'bg-teal-100'
      case 'J':
         return 'bg-cyan-100'
      case 'K':
         return 'bg-blue-light-100'
      case 'L':
         return 'bg-blue-100'
      case 'M':
         return 'bg-blue-dark-100'
      case 'N':
         return 'bg-orange-100'
      case 'O':
         return 'bg-indigo-100'
      case 'P':
         return 'bg-violet-100'
      case 'Q':
         return 'bg-purple-100'
      case 'R':
         return 'bg-fuchsia-100'
      case 'S':
         return 'bg-pink-100'
      case 'T':
         return 'bg-rose-100'
      case 'U':
         return 'bg-orange-dark-100'
      case 'V':
         return 'bg-yellow-100'
      case 'W':
         return 'bg-blue-dark-100'
      case 'X':
         return 'bg-teal-100'
      case 'Y':
         return 'bg-green-100'
      case 'Z':
         return 'bg-moss-100'
      default:
         return 'bg-green-light-100'
   }
}
