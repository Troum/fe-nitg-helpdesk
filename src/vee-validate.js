import {extend, localize} from 'vee-validate';
import {min, required} from "vee-validate/dist/rules";
import ru from 'vee-validate/dist/locale/ru';

extend('required', required);
extend('min', min);


localize('ru', ru);
