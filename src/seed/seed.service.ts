import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { TrivialService } from '../trivial/trivial.service';

async function bootstrap() {

  const app = await NestFactory.createApplicationContext(AppModule);

  
  const usersService = app.get(UsersService);
  const trivialService = app.get(TrivialService);

  console.log('🌱 INICIANDO SEED MANUAL...');


  const adminEmail = 'palpatine@darth.com';
  const adminPass = 'palpatine';

  console.log('👤 Gestionando usuario Admin...');

  try {
    
    const existingUser = await usersService.findEmail(adminEmail);

    
    if (existingUser) {
        console.log('   ♻️ Usuario encontrado. Borrando para regenerar limpio...');
        if (usersService['remove']) {
            await usersService['remove'](existingUser.id);
        } else if (usersService['delete']) {
            await usersService['delete'](existingUser.id);
        } else {
             
             console.warn('   ⚠️ No se pudo borrar automáticamente. Si la contraseña falla, bórralo en Mongo Compass.');
        }
    }

   
    const checkUser = await usersService.findEmail(adminEmail);

    if (!checkUser) {    
        console.log('   ⚡ Creando a Palpatine...');
        await usersService.create({
            name: 'Emperador Palpatine',
            email: adminEmail,
            password: adminPass, // Tu servicio la encriptará
            age: 84,
            roles: ['admin', 'user']
        } as any);
        
        console.log('   ✅ Admin creado: palpatine@darth.com / palpatine');
    } else {
        console.log('   ⏭️ El usuario ya existe y no se pudo borrar. Saltando creación.');
    }

  } catch (error) {
      console.error('   ❌ Error en bloque Admin:', error.message);
  }


  console.log('📚 Gestionando Preguntas...');
  
 
  try {
      if (trivialService['removeAll']) await trivialService.removeAll();
      else if (trivialService['deleteMany']) await trivialService['deleteMany']();
      console.log('   🧹 Preguntas antiguas eliminadas.');
  } catch (e) {
      console.log('   ⚠️ No se pudieron borrar preguntas antiguas (quizás la BD está vacía).');
  }
  const preguntas = [
    
    { question: '¿Quién es el padre de Luke Skywalker?', answer: 'Darth Vader', options: ['Obi-Wan Kenobi', 'Palpatine', 'Darth Vader', 'Yoda'], points: 10 },
    { question: '¿Cómo se llama la nave de Han Solo?', answer: 'Halcón Milenario', options: ['X-Wing', 'Halcón Milenario', 'Estrella de la Muerte', 'Tie Fighter'], points: 10 },
    { question: '¿De qué color es el sable de luz de Mace Windu?', answer: 'Morado', options: ['Azul', 'Verde', 'Rojo', 'Morado'], points: 20 },
    { question: '¿Quién construyó a C-3PO?', answer: 'Anakin Skywalker', options: ['Luke Skywalker', 'Anakin Skywalker', 'Padmé Amidala', 'R2-D2'], points: 30 },
    { question: '¿Cómo se llaman los soldados de asalto del Imperio?', answer: 'Stormtroopers', options: ['Clones', 'Stormtroopers', 'Droides', 'Mandalorianos'], points: 10 },
    { question: '¿Cuál es el planeta natal de Anakin y Luke?', answer: 'Tatooine', options: ['Naboo', 'Coruscant', 'Hoth', 'Tatooine'], points: 15 },
    { question: '¿Quién mató al Emperador Palpatine (originalmente)?', answer: 'Darth Vader', options: ['Luke Skywalker', 'Darth Vader', 'Han Solo', 'Leia Organa'], points: 50 },
    { question: '¿Qué especie es Chewbacca?', answer: 'Wookiee', options: ['Ewok', 'Wookiee', 'Jawa', 'Hutt'], points: 20 },
    
    { question: '¿Cómo se llama "El Niño" en The Mandalorian?', answer: 'Grogu', options: ['Yoda Jr.', 'Grogu', 'Mando', 'Babu Frik'], points: 20 },
    { question: '¿Quién es el maestro de Obi-Wan Kenobi?', answer: 'Qui-Gon Jinn', options: ['Yoda', 'Mace Windu', 'Qui-Gon Jinn', 'Conde Dooku'], points: 25 },
    { question: '¿En qué sustancia congelaron a Han Solo?', answer: 'Carbonita', options: ['Hielo seco', 'Carbonita', 'Magma', 'Acero'], points: 15 },
    { question: '¿Cuál es el nombre Sith del Conde Dooku?', answer: 'Darth Tyranus', options: ['Darth Maul', 'Darth Plagueis', 'Darth Tyranus', 'Darth Sidious'], points: 40 },
    { question: '¿Qué orden ejecutó a los Jedi?', answer: 'Orden 66', options: ['Orden 99', 'Orden 66', 'Orden 501', 'Orden Primera'], points: 20 },
    { question: '¿Quién dijo: "Es una trampa"?', answer: 'Almirante Ackbar', options: ['Han Solo', 'Lando Calrissian', 'Almirante Ackbar', 'Poe Dameron'], points: 15 },
    { question: '¿Qué planeta fue destruido por la primera Estrella de la Muerte?', answer: 'Alderaan', options: ['Yavin IV', 'Naboo', 'Alderaan', 'Endor'], points: 25 },
    { question: '¿Quién es el cazarrecompensas padre de Boba Fett?', answer: 'Jango Fett', options: ['Boba Fett Sr.', 'Jango Fett', 'Cad Bane', 'Din Djarin'], points: 30 },
    { question: '¿Cómo se llama el droide naranja y blanco de Poe Dameron?', answer: 'BB-8', options: ['R2-D2', 'C-3PO', 'BB-8', 'K-2SO'], points: 10 },
    { question: '¿Cuál es el verdadero nombre de Kylo Ren?', answer: 'Ben Solo', options: ['Jacen Solo', 'Ben Solo', 'Anakin Solo', 'Luke Jr.'], points: 20 },
    { question: '¿Quién posee el sable de luz negro (Darksaber) en The Mandalorian (Temp 2)?', answer: 'Moff Gideon', options: ['Bo-Katan', 'Moff Gideon', 'Ahsoka Tano', 'El Mandaloriano'], points: 35 },
    { question: '¿Cuántos brazos tiene el General Grievous?', answer: '4', options: ['2', '4', '6', '8'], points: 25 },
    { question: '¿Quién ganó la carrera de vainas en Boonta Eve?', answer: 'Anakin Skywalker', options: ['Sebulba', 'Anakin Skywalker', 'Watto', 'Darth Maul'], points: 15 },
    { question: '¿Qué Ewok encuentra a Leia en Endor?', answer: 'Wicket', options: ['Logray', 'Wicket', 'Chief Chirpa', 'Teebo'], points: 40 },
    { question: '¿A quién servía Darth Maul?', answer: 'Darth Sidious', options: ['Darth Vader', 'Darth Plagueis', 'Darth Sidious', 'Snoke'], points: 20 },
    { question: '¿De qué color es el brazo de C-3PO en El Despertar de la Fuerza?', answer: 'Rojo', options: ['Dorado', 'Plateado', 'Rojo', 'Azul'], points: 50 },
    { question: '¿Quién fue el dueño original del Halcón Milenario antes de Han?', answer: 'Lando Calrissian', options: ['Chewbacca', 'Lando Calrissian', 'Jabba el Hutt', 'Maz Kanata'], points: 25 },
    { question: '¿Cómo se llama el planeta helado del Episodio V?', answer: 'Hoth', options: ['Starkiller Base', 'Hoth', 'Ilum', 'Kamino'], points: 10 },
    { question: '¿Qué personaje disparó primero en la cantina (versión original)?', answer: 'Han Solo', options: ['Greedo', 'Han Solo', 'Chewbacca', 'Luke'], points: 30 },
    { question: '¿Quién entrenó a Luke en Dagobah?', answer: 'Yoda', options: ['Obi-Wan', 'Yoda', 'Qui-Gon', 'Maz Kanata'], points: 15 }
  ];

  for (const p of preguntas) {
      await trivialService.create(p as any);
  }
  console.log(`   ✅ ${preguntas.length} Preguntas insertadas.`);

  await app.close();
  console.log('👋 SEED FINALIZADO.');
}

bootstrap();
