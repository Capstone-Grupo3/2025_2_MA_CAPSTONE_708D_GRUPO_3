import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear un reclutador administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.recruiter.upsert({
    where: { correo: 'admin@apt.com' },
    update: {},
    create: {
      nombreCompleto: 'Administrador APT',
      correo: 'admin@apt.com',
      password: hashedPassword,
      rol: 'admin',
      activo: true,
    },
  });

  console.log('✅ Usuario administrador creado:', {
    id: admin.id,
    correo: admin.correo,
    rol: admin.rol,
  });

  // Crear una empresa de ejemplo
  const empresa = await prisma.company.upsert({
    where: { rut: '96.123.456-7' },
    update: {},
    create: {
      nombre: 'Empresa Ejemplo S.A.',
      rut: '96.123.456-7',
      correo: 'contacto@ejemplo.com',
      telefono: '+56912345678',
      direccion: 'Av. Providencia 123, Santiago',
    },
  });

  console.log('✅ Empresa de ejemplo creada:', {
    id: empresa.id,
    nombre: empresa.nombre,
  });

  // Crear una oferta laboral de ejemplo
  const job = await prisma.job.upsert({
    where: { slug: 'desarrollador-fullstack-ejemplo' },
    update: {},
    create: {
      empresaId: empresa.id,
      creadaPorId: admin.id,
      slug: 'desarrollador-fullstack-ejemplo',
      titulo: 'Desarrollador Full Stack',
      descripcion: 'Buscamos un desarrollador con experiencia en React y Node.js para unirse a nuestro equipo.',
      ubicacion: 'Santiago, Chile',
      modalidad: 'híbrido',
      tipoContrato: 'indefinido',
      cantidadVacantes: 2,
      rangoSalarial: '$1.500.000 - $2.500.000',
      estado: 'abierta',
    },
  });

  console.log('✅ Oferta laboral de ejemplo creada:', {
    id: job.id,
    titulo: job.titulo,
  });

  // Crear un candidato de ejemplo
  const candidate = await prisma.candidate.upsert({
    where: { correo: 'juan.perez@email.com' },
    update: {},
    create: {
      nombreCompleto: 'Juan Pérez González',
      correo: 'juan.perez@email.com',
      telefono: '+56987654321',
      nacionalidad: 'Chilena',
      fechaNacimiento: new Date('1995-03-15'),
      linkedin: 'https://linkedin.com/in/juan-perez',
    },
  });

  console.log('✅ Candidato de ejemplo creado:', {
    id: candidate.id,
    nombre: candidate.nombreCompleto,
  });

  // Crear una postulación de ejemplo
  const application = await prisma.application.upsert({
    where: { 
      ofertaId_candidatoId: {
        ofertaId: job.id,
        candidatoId: candidate.id,
      }
    },
    update: {},
    create: {
      ofertaId: job.id,
      candidatoId: candidate.id,
      cvUrl: 'https://ejemplo.com/cv-juan-perez.pdf',
      respuestas: {
        experiencia: '3 años en desarrollo web',
        motivacion: 'Me interesa mucho trabajar en esta empresa',
      },
      etapa: 'nueva',
      fuente: 'portal',
    },
  });

  console.log('✅ Postulación de ejemplo creada:', {
    id: application.id,
    etapa: application.etapa,
  });

  // Crear evento inicial de la postulación
  await prisma.applicationEvent.create({
    data: {
      postulacionId: application.id,
      etapaAnterior: null,
      etapaNueva: 'nueva',
      cambiadoPorId: admin.id,
      nota: 'Postulación recibida automáticamente',
    },
  });

  console.log('✅ Evento de postulación creado');

  console.log('\n🎉 ¡Seed completado exitosamente!');
  console.log('\n📋 Datos de prueba creados:');
  console.log('👤 Usuario Admin:');
  console.log('   Email: admin@apt.com');
  console.log('   Password: admin123');
  console.log('\n🏢 Empresa: Empresa Ejemplo S.A.');
  console.log('💼 Oferta: Desarrollador Full Stack');
  console.log('👨‍💻 Candidato: Juan Pérez González');
  console.log('📝 Postulación: En etapa "nueva"');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });