-- Railway ya tiene usuarios creados automaticamente como el root, por lo tanto solo se incluyen los usuarios creados manualmente, con la limitante de que solo nos permite crear 1 por ser un servicio gratuito.
CREATE USER 'administrador'@'%' IDENTIFIED BY 'administrador';

-- Permisos asignados al usuario 'administrador'
GRANT USAGE ON *.* TO 'administrador'@'%';
GRANT ALL PRIVILEGES ON `railway`.* TO 'administrador'@'%';

-- Aplicar cambios
FLUSH PRIVILEGES;
