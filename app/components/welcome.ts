import Component from '@glimmer/component';

interface WelcomeArgs{
  name: string;
  age:number;
}

export default class WelcomeComponent extends Component<WelcomeArgs> {

get prueba(): WelcomeArgs {

  return this.args;
}


}
