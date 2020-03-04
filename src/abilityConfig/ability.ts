import { Ability } from '@casl/ability'
import { store} from '../Store'

const storeData= store.getState();
const abilities = storeData.authentication ? storeData.authentication.abilities : []
export default new Ability(abilities)
